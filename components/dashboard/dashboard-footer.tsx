export function DashboardFooter() {
    return (
        <footer className="border-t bg-background/50 py-4 px-6 fixed bottom-0 z-10 w-full mb-2">
            <div className="flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Don Puerto
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Support</a>
                </div>
            </div>
        </footer>
    )
}
