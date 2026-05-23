export async function GET() {
  return Response.json({
    liveCount: 3241 + Math.floor(Math.random() * 100),
    wishCount: 1847,
    countriesCount: 84,
  });
}
