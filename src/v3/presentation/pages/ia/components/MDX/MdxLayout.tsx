/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react"
import { Typography, Box, Table as MUITable, TableBody, TableCell as MUITableCell, TableHead, TableRow as MUITableRow, Button, CircularProgress } from "@mui/material"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import "highlight.js/styles/base16/3024.css"

hljs.registerLanguage("javascript", typescript)

const CustomImageWrapper = ({ src, alt }: { src: string; alt: string }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]

  const isValidImage = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase()
    return validImageExtensions.includes(extension || "")
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      const fileName = src.split("/").pop() || `download_${new Date().getTime()}.png`
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!isValidImage(src)) {
    return (
      <Box
        sx={{
          maxWidth: 650,
          border: "1px solid rgba(255,255,255,0.1)",
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          variant="outlined"
          startIcon={isDownloading ? <CircularProgress size={20} /> : null}
        >
          Clique aqui para baixar o arquivo
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: 650,
        border: "1px solid rgba(255,255,255,0.1)",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        variant="outlined"
        startIcon={isDownloading ? <CircularProgress size={20} /> : null}
      >
        Baixar
      </Button>
      <img src={src} alt={alt} style={{ maxWidth: "100%", height: "auto" }} />
    </Box>
  )
}

const Code = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref?.current) hljs.highlightElement(ref.current)
  }, [ref])

  return (
    <Box
      component="code"
      sx={{ whiteSpace: "pre-wrap", backgroundColor: "#1e1e1e", p: 1, borderRadius: 1 }}
      ref={ref}
    >
      {children}
    </Box>
  )
}

const Table = ({ children }: { children?: React.ReactNode }) => (
  <MUITable sx={{ borderCollapse: "collapse", width: "100%" }}>{children}</MUITable>
)

const TableRow = ({ children }: { children?: React.ReactNode }) => (
  <MUITableRow sx={{ borderBottom: "1px solid gray" }}>{children}</MUITableRow>
)

const TableCell = ({ children }: { children?: React.ReactNode }) => (
  <MUITableCell sx={{ borderBottom: "1px solid gray", p: 1 }}>{children}</MUITableCell>
)

const parseMarkdownToTable = (text: string | undefined) => {
  if (!text) return null

  const tableRegex = /\|(.+)\|/g
  const rows = text.split("\n").filter((line) => tableRegex.test(line))

  if (rows.length > 0) {
    const headers = rows[0].split("|").map((header) => header.trim()).filter(Boolean)
    const dataRows = rows.slice(1).map((row) =>
      row.split("|").map((cell) => cell.trim()).filter(Boolean)
    )

    return (
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((dataRow, rowIndex) => (
            <TableRow key={rowIndex}>
              {dataRow.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return text
}

const CustomParagraph = ({ children }: { children: string }) => {
  const isChildrenString = typeof children === "string"
  const isTable = isChildrenString && children?.includes("|") && children?.includes("-") ? true : false

  if (isTable) {
    const tableHtml = parseMarkdownToTable(children)
    if (tableHtml) {
      return tableHtml
    }
  }

  return <Typography variant='body1'>{children}</Typography>
}

const components = (): Record<string, React.ComponentType<any>> => ({
  h1: ({ children }) => <Typography variant="h2">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h4">{children}</Typography>,
  ol: ({ children }) => <Box component="ol" sx={{ pl: 3 }}>{children}</Box>,
  ul: ({ children }) => <Box component="ul" sx={{ pl: 3, fontSize: '16px' }}>{children}</Box>,
  li: ({ children }) => <Box component="li" sx={{ fontSize: '16px' }}>{children}</Box>,
  a: ({ children, ...props }) => (
    <Typography component="a" sx={{ color: "cyan", textDecoration: "underline" }} {...props}>
      {children}
    </Typography>
  ),
  img: CustomImageWrapper as any,
  code: Code,
  table: Table,
  tr: TableRow,
  td: TableCell,
  th: TableCell,
  p: CustomParagraph as any,
})

export default function MDXComponent<TScope, TFrontmatter>(props: MDXRemoteProps<TScope, TFrontmatter>) {
  return (
    <Box sx={{ ".markdown": { fontFamily: "Roboto, sans-serif" } }}>
      <MDXRemote {...props} components={components()} />
    </Box>
  )
}
