import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../validtionSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest ,{ params }: {params: { id: string }}) {
    
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json({status: 400, json: validation.error.format()});
    }

    const issue = await prisma.issue.findUnique({
        where: { id: Number(params.id) }
    });

    if (!issue) {
        return NextResponse.json({status: 404, json: "Issue not found"});
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: Number(issue.id) },
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}





export async function DELETE(request: NextRequest ,{ params }: {params: { id: string }}) {
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const issue = await prisma.issue.findUnique({
        where: { id: Number(params.id) }
    });

    if (!issue) {
        return NextResponse.json({status: 404, json: "Issue not found"});
    }

    await prisma.issue.delete({
        where: { id: Number(issue.id) }
    });

    return NextResponse.json({status: 200, json: "Issue deleted"});
}