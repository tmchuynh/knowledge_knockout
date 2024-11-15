import { User } from "@/backend/models";

export async function GET(
    request: Request,
    props: { params: { username: string, password: string; }; }
) {
    const params = await props.params;

    try {

    } catch ( err ) {

    }
}