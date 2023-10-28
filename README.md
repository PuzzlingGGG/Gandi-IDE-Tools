# Gandi-IDE-Tools

Gandi-IDE-Tools is a Chrome extension designed to enhance the Gandi IDE experience by providing a collection of developer tools. With Gandi-IDE-Tools, you can easily enable or disable individual tools, execute them on-demand, and even run all enabled tools with a single click.

## Features

- **Individual Tool Activation:** Enable or disable tools as needed.
- **On-Demand Execution:** Run individual tools on-demand.
- **Run All Enabled Tools:** Execute all enabled tools with a single click.
- **Easily Extendable:** Add new tools to the `tools.json` file to extend the functionality of the extension.

## Installation

1. Clone this repository or download the ZIP file and extract it.
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable Developer mode by toggling the switch in the upper-right corner.
4. Click on "Load unpacked" and select the directory containing the Gandi-IDE-Tools extension files.
5. The Gandi-IDE-Tools extension icon should now appear in your browser toolbar.

## Usage

1. Click on the Gandi-IDE-Tools icon in your browser toolbar to open the popup.
2. In the popup, you'll see a list of available tools. Toggle the switch next to a tool to enable or disable it.
3. Click on "Run Tool" next to a tool to execute it on-demand.
4. Click on "Run All Enabled Tools" to execute all enabled tools at once.

Certainly! Here's an updated "Contributing" section that includes instructions on how to add a new tool to the Gandi-IDE-Tools extension:

## Contributing

We welcome contributions! If you have a tool you'd like to add, or an improvement you'd like to make, please feel free to create a pull request.

### Adding a New Tool

1. **Create a New Tool Object:** 
   - Create a new tool object in the `tools.json` file following the existing format. 
   - Each tool object should have a unique ID and should contain a `details` object with `name`, `description`, and `jsCode` properties.
   - The `jsCode` property should contain the JavaScript code for the tool as a string.

```json
{
    "your-tool-id": {
        "details": {
            "name": "Your Tool Name",
            "description": "A brief description of your tool.",
            "jsCode": "console.log('Hello, World!');"
        }
    },
    // ... other tools ...
}
```

2. **Test Your Tool:**
   - Load or reload the Gandi-IDE-Tools extension in your browser.
   - Enable your tool in the Gandi-IDE-Tools popup and test it on the Gandi IDE page to ensure it works as expected.

3. **Submit a Pull Request:**
   - Fork the Gandi-IDE-Tools repository, add your tool to the `tools.json` file in your fork, and submit a pull request.
   - In your pull request description, explain what your tool does and how to use it.

Your contributions help make Gandi-IDE-Tools better, and we appreciate your support!

## License

[MIT License](LICENSE)
