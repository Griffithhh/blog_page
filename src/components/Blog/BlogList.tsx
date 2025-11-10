"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { getBlogs } from "@/lib/api";
import { Blog } from "@/types";

export default function BlogList() {
  const t = useTranslations();
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <p>{t("loading")}</p>;

  if (!blogs || blogs.length === 0)
    return <p className="text-center text-gray-500 mt-10">{t("not_found")}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-4">
      {blogs.map((blog, index) => (
        <Card key={blog.id ?? index} className="shadow-sm">
          <CardHeader>
            <Link
              className="text-lg font-semibold text-blue-600 hover:underline"
              href={`/en/blog/${blog.id ?? index}`}
            >
              {blog.title || "No title"}
            </Link>
          </CardHeader>
          <CardBody className="text-gray-600">
            {blog.content ? blog.content.substring(0, 80) : "No content"}...
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
