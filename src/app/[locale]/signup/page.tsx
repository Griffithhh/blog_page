'use client';

import {usePathname, useRouter} from 'next/navigation'
import { signup } from './actions'
import {Card, CardHeader, CardBody, Input, Button} from '@heroui/react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import {createClient} from "../../../../utils/supabase/client";

export default function SignupPage() {
  const router = useRouter()
  const t = useTranslations()
  const pathname = usePathname();
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await signup(formData)
    if (!res) return

    if (res.success) {
      toast.success(res.message)
      router.push('/login')
    } else {
      toast.error(res.message)
    }
  }



  const switchLocale = (locale: "en" | "de") => {

    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale;
    router.push('/' + segments.join('/'));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute top-4 right-4 flex gap-3" >

              <Button
        onPress={() => switchLocale('en')}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        EN
      </Button>

      <Button
        onPress={() => switchLocale('de')}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        DE
      </Button>
        </div>
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <h1 className="text-2xl font-semibold text-black">
            {t('signup_title')}
          </h1>
          <p className="text-gray-500">
            {t('signup_subtitle')}
          </p>
        </CardHeader>

        <CardBody className="pt-4 flex flex-col gap-6">
          <form className="flex flex-col gap-6" onSubmit={handleSignup}>
            <Input
                type="text"
                name="full_name"
                label={t('signup_full_name')}
                required
            />

            <Input
                type="email"
                name="email"
                label={t('signup_email')}
                required
            />

            <Input
                type="password"
                name="password"
                label={t('signup_password')}
                required
            />

            <button
                type="submit"
                className="cursor-pointer border border-gray-300 text-black hover:bg-gray-100 py-3 rounded-lg"
            >
              {t('signup_button')}
            </button>
            <button
                type="button"
                onClick={() => router.push('/login')}
                className="cursor-pointer text-black underline hover:text-gray-700 text-sm mt-2"
            >
              {t('signup_no_account')}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
