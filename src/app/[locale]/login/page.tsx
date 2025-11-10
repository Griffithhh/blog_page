'use client';

import {usePathname, useRouter} from 'next/navigation'
import { login } from './actions'
import {Card, CardHeader, CardBody, Input, Button} from '@heroui/react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations()
  const pathname = usePathname();
  const switchLocale = (locale: "en" | "de") => {

    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale;
    router.push('/' + segments.join('/'));
  };
  return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="absolute top-4 right-4 flex gap-3">

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
                      {t('login_welcome')}
                  </h1>
                  <p className="text-gray-500">
                      {t('login_subtitle')}
                  </p>
              </CardHeader>

              <CardBody className="pt-4 flex flex-col gap-6">
                  <form
                      className="flex flex-col gap-6"
                      onSubmit={async (e) => {
                          e.preventDefault()
                          const formData = new FormData(e.currentTarget)
                          const res = await login(formData)
                          if (!res) return

                          res.success
                              ? toast.success(res.message)
                              : toast.error(res.message)

                          if (res.success) router.push('/')
                      }}
                  >
                      <Input
                          type="email"
                          name="email"
                          label={t('login_email')}
                          required
                      />

                      <Input
                          type="password"
                          name="password"
                          label={t('login_password')}
                          required
                      />

                      <button
                          type="submit"
                          className="cursor-pointer bg-black text-white hover:bg-gray-900 py-3 rounded-lg"
                      >
                          {t('login_button')}
                      </button>
                  </form>

                  <button
                      type="button"
                      onClick={() => router.push('/signup')}
                      className="cursor-pointer text-black underline hover:text-gray-700 text-sm mt-2"
                  >
                      {t('login_no_account')}
                  </button>
              </CardBody>
          </Card>
      </div>
  )
}
