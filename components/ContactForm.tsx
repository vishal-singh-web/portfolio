"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5)
})

type ContactForm = z.infer<typeof ContactSchema>

export default function ContactForm(){
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({ resolver: zodResolver(ContactSchema) })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    emailjs.init('V3SC42SX5ZQpQ6xw-')
  }, [])

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitStatus('idle')
      await emailjs.send('service_dlwhdtk', 'template_viq2uhl', {
        user_name: data.name,
        user_email: data.email,
        message: data.message
      })
      setSubmitStatus('success')
      reset()
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error: any) {
      console.error('EmailJS error:', error?.text || error?.message || error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-lg">
      <div>
        <label className="text-sm text-slate-200">Name</label>
        <input className="w-full mt-1 p-2 rounded bg-slate-900/40 border border-white/6" {...register('name')} />
        {errors.name && <div className="text-xs text-rose-400">{errors.name.message}</div>}
      </div>
      <div>
        <label className="text-sm text-slate-200">Email</label>
        <input className="w-full mt-1 p-2 rounded bg-slate-900/40 border border-white/6" {...register('email')} />
        {errors.email && <div className="text-xs text-rose-400">{errors.email.message}</div>}
      </div>
      <div>
        <label className="text-sm text-slate-200">Message</label>
        <textarea rows={4} className="w-full mt-1 p-2 rounded bg-slate-900/40 border border-white/6" {...register('message')}></textarea>
        {errors.message && <div className="text-xs text-rose-400">{errors.message.message}</div>}
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-lg bg-electric hover:bg-electric/90 text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
        {submitStatus === 'success' && <span className="text-sm text-green-400 font-medium">✓ Message sent!</span>}
        {submitStatus === 'error' && <span className="text-sm text-rose-400 font-medium">✗ Failed to send</span>}
      </div>
    </form>
  )
}
