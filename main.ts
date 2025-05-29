import { Plugin, TFile, WorkspaceLeaf, ItemView, FileView } from "obsidian";

export default class URLFilesPlugin extends Plugin {
  async onload() {
    console.log("Loading URL Files Plugin");

    // Register the URL file extension with Obsidian
    this.registerExtensions(["url"], "url");
    this.registerView("url", (leaf) => new URLFilesView(leaf));
  }

  onunload() {
    console.log("Unloading URL Files Plugin");
  }
}

export class URLFilesView extends FileView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return "url";
  }

  getDisplayText() {
    return "Opened URL";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
  }

  async onLoadFile(file: TFile): Promise<void> {
    try {
      // Read the .url file content
      const url = await this.app.vault.read(file);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error handling URL file:", error);
    }
  }
}
