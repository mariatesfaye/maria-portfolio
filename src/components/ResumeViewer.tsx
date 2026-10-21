import { Download, ExternalLink as ExternalIcon } from "lucide-react"
import { profile, resume } from "@/data/portfolio"

const primaryAction =
  "inline-flex min-h-11 items-center justify-center gap-2 bg-text px-4 text-sm text-bg hover:opacity-80"
const secondaryAction =
  "inline-flex min-h-11 items-center justify-center gap-2 border border-control px-4 text-sm hover:border-text"

function DownloadLink({ className }: { className?: string }) {
  return (
    <a href={resume.path} download={resume.downloadName} className={className ?? primaryAction}>
      <Download aria-hidden="true" className="size-4" />
      Download PDF
    </a>
  )
}

function OpenLink({ className }: { className?: string }) {
  return (
    <a href={resume.path} target="_blank" rel="noopener noreferrer" className={className ?? secondaryAction}>
      <ExternalIcon aria-hidden="true" className="size-4" />
      Open in new tab
    </a>
  )
}

export function ResumeViewer() {
  return (
    <div>
      <h1 className="text-3xl font-medium tracking-tight">Resume</h1>
      <p className="mt-3 max-w-[68ch] leading-7 text-muted">Read it here or download the PDF.</p>
      {resume.updated ? (
        <p className="mt-3 font-mono text-xs text-muted">Updated {resume.updated}</p>
      ) : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <DownloadLink className={`${primaryAction} w-full sm:w-auto`} />
        <OpenLink className={`${secondaryAction} w-full sm:w-auto`} />
      </div>
      <div className="mt-8 hidden border border-control bg-surface md:block">
        <object
          data={`${resume.path}#toolbar=0&navpanes=0`}
          type="application/pdf"
          title="Maria Tesfaye resume PDF"
          className="h-[80vh] w-full"
        >
          <div className="p-6">
            <p className="max-w-[68ch] leading-7">This browser cannot show the PDF inline.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <DownloadLink />
              <OpenLink />
            </div>
          </div>
        </object>
      </div>
      <div className="mt-8 border border-control bg-surface p-6 md:hidden">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">PDF</p>
        <p className="mt-2 text-sm break-all">{resume.downloadName}</p>
        <div className="mt-5 flex flex-col gap-3">
          <DownloadLink className={`${primaryAction} w-full`} />
          <OpenLink className={`${secondaryAction} w-full`} />
        </div>
      </div>
    </div>
  )
}

export function ResumeUnavailable() {
  return (
    <div>
      <h1 className="text-3xl font-medium tracking-tight">Resume is not available yet</h1>
      <p className="mt-3 max-w-[68ch] leading-7 text-muted">A resume file has not been added to this site.</p>
      <p className="mt-6">
        <a
          href={`mailto:${profile.email}`}
          className="text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
        >
          {profile.email}
        </a>
      </p>
    </div>
  )
}
