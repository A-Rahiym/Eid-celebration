import { MESSAGES } from '@/lib/constants';
import type { Wish } from '@/lib/types';

const store: Wish[] = [...MESSAGES];
let nextId = 100;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';

  const wishes = [...store];

  if (filter === 'popular') {
    wishes.sort((a, b) => {
      const sumA = Object.values(a.reactions).reduce((s, v) => s + v, 0);
      const sumB = Object.values(b.reactions).reduce((s, v) => s + v, 0);
      return sumB - sumA;
    });
  } else if (filter === 'recent') {
    wishes.reverse();
  }

  return Response.json({ wishes, total: store.length });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.text || typeof body.text !== 'string') {
    return Response.json({ error: 'Text is required' }, { status: 400 });
  }

  const locVal = body.location || '🌍 Everywhere';
  const locParts = locVal.split(' ');
  const flag = locParts[0];
  const country = locParts.slice(1).join(' ') || 'Everywhere';

  const newWish: Wish = {
    id: ++nextId,
    name: 'You',
    loc: `${flag} ${country}`,
    text: body.text.slice(0, 280),
    time: 'just now',
    reactions: { '🌙': 0, '✨': 0, '❤️': 0 },
    color: '#0e2040',
    accent: '#c9a96e',
  };

  store.unshift(newWish);

  return Response.json(newWish, { status: 201 });
}
