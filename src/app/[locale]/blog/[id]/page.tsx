'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getBlogById } from '@/lib/api';
import { Blog } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function BlogPage() {
  const t = useTranslations();
  const { id } = useParams();
  const blogId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const { data: blog, isLoading, isError } = useQuery<Blog>({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId) return <p className="text-red-500 text-center mt-10">{t('not_found')}</p>;
  if (isLoading) return <p className="text-center mt-10">{t('loading')}</p>;
  if (isError || !blog) return <p className="text-red-500 text-center mt-10">{t('not_found')}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-4">
      <Card className="shadow-sm">
        <CardHeader>
          <h1 className="text-lg font-semibold text-blue-600">{blog.title}</h1>
        </CardHeader>
        <CardBody className="text-gray-600">{blog.content}</CardBody>
      </Card>

      {/* Квадратная кнопка с стрелкой */}
      <Button
  className="w-10 h-10 p-2 mt-4 flex items-center justify-center bg-black text-white hover:bg-gray-800"
        onClick={() => router.push('/')}
      >
        <ArrowLeft size={16} />
      </Button>
    </div>
  );
}
