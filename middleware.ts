import withAuth from "next-auth/middleware"
import { authOptions } from "@/app/auth/authOptions"

export default withAuth({
  jwt: { decode: authOptions.jwt?.decode },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})


export const config = {
    matcher: [
        "/issues/new",
        "/issues/edit/:id+",
    ] }