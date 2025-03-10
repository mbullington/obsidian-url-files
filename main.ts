import { App, Plugin, TFile, PluginSettingTab, Setting } from "obsidian";

export default class URLFilesPlugin extends Plugin {
  async onload() {
    console.log("Loading URL Files Plugin");

    // Register the URL file extension with Obsidian
    this.registerExtensions(["url"], "url");

    // Handle clicks on .url files
    this.registerEvent(
      this.app.workspace.on("file-open", async (_file: TFile) => {
        const leaf = this.app.workspace.getLeavesOfType("url").first();

        const file = leaf?.getViewState().state?.file as string | undefined;
        if (!file) {
          return;
        }

        const successful = await this.handleURLFile(file);
      })
    );
  }

  onunload() {
    console.log("Unloading URL Files Plugin");
  }

  async handleURLFile(file: string) {
    try {
      // Read the .url file content
      const url = await this.app.vault.read(
        this.app.vault.getFileByPath(file)!
      );
      console.log(url);
      window.open(url, "_blank");

      return true;
    } catch (error) {
      console.error("Error handling URL file:", error);
      return false;
    }
  }
}
