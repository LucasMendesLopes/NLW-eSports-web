import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLElement> { }

export function Input({ ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`text-sm rounded py-3 px-4  bg-zinc-900 placeholder:text-zinc-500`}
        />
    )
}

