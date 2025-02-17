import { handlers } from "@/app/_lib/auth";

export function GET(req, context) {
  return handlers.GET(req, context);
}

export function POST(req, context) {
  return handlers.POST(req, context);
}
