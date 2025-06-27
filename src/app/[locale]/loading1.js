'use client'

import { useEffect, useRef } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../styles/globals.css'

export default function Loading1() {
    const timer = useRef(null)

    useEffect(() => {
        timer.current = setTimeout(() => {
            NProgress.start()
        }, 100)

        return () => {
            clearTimeout(timer.current)
            NProgress.done()
        }
    }, [])


}
