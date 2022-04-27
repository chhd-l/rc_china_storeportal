import cn from "classnames"
import React, { FC, ReactElement } from "react"

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
  title?: ReactElement | string
}

const Container: FC<Props> = ({ children, className, el = "div", clean }) => {
  const rootClassName = cn(className)

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return <Component className={rootClassName}>{children}</Component>
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return <Container className="px-6 py-6 ">{children}</Container>
}

export const SearchContainer: FC<Props> = ({ children }) => {
  return <Container className="px-9 py-7 bg-white">{children}</Container>
}

export const TableContainer: FC<Props> = ({ children }) => {
  return <Container className="px-10 py-7 bg-white">{children}</Container>
}

export const InfoContainer: FC<Props> = ({ children, title }) => {
  return (
    <Container className="px-10 py-7 bg-white">
      {title ? <Container className="pb-7 text-lg">{title}</Container> : null}
      {children}
    </Container>
  )
}

export default Container
