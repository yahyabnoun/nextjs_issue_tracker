import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../validtionSchemas";
import prisma from "@/prisma/client";

export async function PATCH(request: NextRequest ,
     {params} : {params: {id: string}}) {

    const body = await request.json()
    const validation = issueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({status : 400, json : validation.error.format()}) 
    }

    const issue = await prisma.issue.findUnique({
        where: {id: Number(params.id)}
    })

    if (!issue) {
        return NextResponse.json({status : 404, json : "Issue not found"}) 
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: Number(issue.id)},
        data: {title: body.title, description: body.description}
    })


    return NextResponse.json(updatedIssue, {status : 200})
}