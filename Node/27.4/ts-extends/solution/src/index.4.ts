function handleStatus(status: Status): void {
    if (status === "success") {
        console.log("Everything went fine!");
    } else if (status === "error") {
        console.log("There was a problem!");
    } else if (status === "loading") {
        console.log("Loading, please wait...");
    }
}

type Status = "success" | "error" | "loading" 