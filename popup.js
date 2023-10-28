async function fetchTools() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/PuzzlingGGG/Gandi-IDE-Tools/main/tools.json');
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function toggleToolContent(id) {
    var content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function runEnabledTools() {
    const tools = {};
    const toolElements = document.querySelectorAll('.tool');
    toolElements.forEach(toolElement => {
        const toolId = toolElement.id;
        const checkbox = document.getElementById(`${toolId}-enabled`);
        if (checkbox.checked) {
            const jsCode = checkbox.getAttribute('data-js-code');
            tools[toolId] = { enabled: true, jsCode };
        }
    });
    chrome.runtime.sendMessage({ action: 'runEnabledTools', tools });
}

function loadTools() {
    const toolsContainer = document.getElementById('tools-container');
    fetchTools().then(data => {
        Object.keys(data).forEach(toolId => {
            const tool = data[toolId];
            const toolDiv = document.createElement('div');
            toolDiv.className = 'tool';
            toolDiv.id = toolId;
            toolDiv.innerHTML = `
                <div class="tool-header" onclick="toggleToolContent('${toolId}-content')">${tool.details.name}</div>
                <div class="tool-content" id="${toolId}-content">
                    <input type="checkbox" id="${toolId}-enabled" data-js-code="${tool.details.jsCode}" ${localStorage.getItem(toolId) === 'true' ? 'checked' : ''}>
                    <label for="${toolId}-enabled">Enabled</label>
                    <p>${tool.details.description}</p>
                    <button onclick="executeJsCode(\`${tool.details.jsCode}\`)">Run Tool</button>
                </div>
            `;
            toolsContainer.appendChild(toolDiv);
            document.getElementById(`${toolId}-enabled`).addEventListener('change', function() {
                localStorage.setItem(toolId, this.checked);
            });
        });

        // Create the "Run All Enabled Tools" button
        const runAllButton = document.createElement('button');
        runAllButton.innerText = 'Run All Enabled Tools';
        runAllButton.addEventListener('click', runEnabledTools);
        toolsContainer.appendChild(runAllButton);
    });
}

document.addEventListener('DOMContentLoaded', loadTools);
