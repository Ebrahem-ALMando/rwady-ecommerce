'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function ProgressBar() {
    const pathname = usePathname()

    useEffect(() => {
        NProgress.start()

        const timer = setTimeout(() => {
            NProgress.done()
        }, 400)

        return () => {
            clearTimeout(timer)
        }
    }, [pathname])

    return null
}
