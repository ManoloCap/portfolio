'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields as any,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem] my-8">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8 lg:mb-12 text-gray-800" data={introContent} enableGutter={false} />
        )}
        <div className="p-6 bg-white dark:bg-black shadow-md border-2 border-gray-700 dark:border-pink-200/60 rounded-lg">
          {/* New title paragraph added */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Contact Me</h2>
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <div className="mb-6">
                <RichText data={confirmationMessage} className="text-green-600 font-medium" />
              </div>
            )}
            {isLoading && !hasSubmitted && (
              <p className="text-center text-gray-800">Loading, please wait...</p>
            )}
            {error && (
              <div className="mb-4 text-red-600 text-lg text-center">
                {`${error.status || '500'}: ${error.message || ''}`}
              </div>
            )}
            {!hasSubmitted && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="mb-4 ">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields.map((field, index) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields];
                      if (Field) {
                        return (
                          <div key={index} className="mb-6 last:mb-0 ">
                            <div className="mb-6 last:mb-0">
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  }
                </div>
                <Button form={formID} type="submit"  className="w-full py-3 font-semibold rounded-lg shadow-md transition duration-200 bg-black bg-pink-200/60 hover:bg-pink-500/60 hover:shadow-lg">
                  {submitButtonLabel}
                </Button>
              </form>
            )}
          </FormProvider>
        </div>
    </div>
  )
}
