import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const prismaDirectory = resolve(process.cwd(), 'prisma');
const baseStoriesPath = resolve(prismaDirectory, 'book-stories.md');
const newBookTitle = 'The Power of Being Alone';

type BookStory = { title: string; content: string };
type ExpandedStoriesFile = { name: string; number: number };

function storyFilesInOrder() {
  const expandedFiles: ExpandedStoriesFile[] = readdirSync(prismaDirectory)
    .map((name) => {
      const match = name.match(/^book-stories-expanded-(\d+)\.md$/);
      return match ? { name, number: Number(match[1]) } : null;
    })
    .filter((file): file is ExpandedStoriesFile => file !== null)
    .sort((a, b) => a.number - b.number || a.name.localeCompare(b.name));

  return [baseStoriesPath, ...expandedFiles.map(({ name }) => resolve(prismaDirectory, name))];
}

function parseStories(source: string): BookStory[] {
  const stories: BookStory[] = [];
  let title: string | null = null;
  let contentLines: string[] = [];

  const saveCurrent = () => {
    if (title !== null) stories.push({ title, content: contentLines.join('\n').trim() });
  };

  for (const line of source.split(/\r?\n/)) {
    const marker = line.match(/^=== BOOK: (.+) ===$/);
    if (marker) {
      saveCurrent();
      title = marker[1];
      contentLines = [];
    } else if (title !== null) {
      contentLines.push(line);
    }
  }
  saveCurrent();
  return stories;
}

function pageCount(content: string) {
  return content.split(/^\s*---\s*$/m).length;
}

async function findExactTitle(title: string) {
  return prisma.book.findFirst({ where: { title } });
}

async function selfHelpGenreId() {
  const genres = await prisma.genre.findMany();
  const existingFit = genres.find((genre) => {
    const label = `${genre.name} ${genre.slug}`.toLowerCase();
    return label.includes('self-help') || label.includes('self help') || label.includes('personal growth') || label.includes('personal development');
  });
  if (existingFit) return existingFit.id;
  const genre = await prisma.genre.upsert({
    where: { slug: 'self-help' },
    update: {},
    create: { name: 'Self-Help', slug: 'self-help' },
  });
  return genre.id;
}

async function availablePlaceholderIsbn() {
  const base = 'PLACEHOLDER-POWER-ALONE';
  let suffix = 1;
  let isbn = `${base}-${suffix}`;
  while (await prisma.book.findUnique({ where: { isbn } })) {
    suffix += 1;
    isbn = `${base}-${suffix}`;
  }
  return isbn;
}

async function createPowerOfBeingAlone(content: string) {
  const genreId = await selfHelpGenreId();
  const isbn = await availablePlaceholderIsbn();
  await prisma.book.upsert({
    where: { isbn },
    update: { content },
    create: {
      title: newBookTitle,
      author: 'Unknown author',
      isbn,
      totalCopies: 2,
      availableCopies: 2,
      genreId,
      content,
    },
  });
}

async function main() {
  const mergedStories = new Map<string, string>();
  for (const filePath of storyFilesInOrder()) {
    for (const story of parseStories(readFileSync(filePath, 'utf8'))) {
      mergedStories.set(story.title, story.content);
    }
  }

  if (!mergedStories.size) {
    throw new Error('No book entries found in the story files; no database changes were made.');
  }

  for (const [title, content] of mergedStories) {
    const book = await findExactTitle(title);
    if (book) {
      await prisma.book.update({ where: { id: book.id }, data: { content } });
      console.log(`Updated: ${title} (${pageCount(content)} pages)`);
      continue;
    }

    if (title === newBookTitle) {
      await createPowerOfBeingAlone(content);
      console.log(`Updated: ${title} (${pageCount(content)} pages)`);
    } else {
      console.warn(`Warning: no exact-title book found for: ${title}`);
    }
  }

  if (!mergedStories.has(newBookTitle)) {
    console.warn(`Warning: no story entry found for: ${newBookTitle}; it was not added.`);
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
