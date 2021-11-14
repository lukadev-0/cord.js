"use strict";
// https://github.com/elliot-nelson/rushstack/blob/enelson/docusaurus-experimental/repo-scripts/doc-plugin-docusaurus/src/DocusaurusMarkdownFeature.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumenterPluginManifest = exports.DocusaurusMarkdownFeature = void 0;
const path = require("path");
const node_core_library_1 = require("@rushstack/node-core-library");
const api_documenter_1 = require("@microsoft/api-documenter");
class DocusaurusMarkdownFeature extends api_documenter_1.MarkdownDocumenterFeature {
    constructor() {
        super(...arguments);
        this._apiItemsWithPages = new Set();
    }
    onInitialized() {
        console.log('RushStackFeature: onInitialized()');
    }
    onBeforeWritePage(eventArgs) {
        // Add the Docusaurus frontmatter
        const header = [
            `---`,
            // Generated API docs have a built-in title header below the breadcrumbs
            // `title: ${JSON.stringify(eventArgs.apiItem.displayName)}`,
            `hide_title: true`,
            // Suppress the default Edit button and Next/Prev links for API docs
            `custom_edit_url: null`,
            `pagination_prev: null`,
            `pagination_next: null`,
            `---`,
            '',
        ].join('\n');
        eventArgs.pageContent = header + eventArgs.pageContent;
        // Requires more investigation. HTML comments are ok, but the little empty
        // comments (<!-- -->) that are inserted in between links break the MDX parser
        // in Docusuarus.
        eventArgs.pageContent = eventArgs.pageContent.replace(/<!-- -->/g, ' ');
        this._apiItemsWithPages.add(eventArgs.apiItem);
    }
    onFinished(eventArgs) {
        const navigationFile = {
            type: 'category',
            label: 'API Reference',
            items: [
                {
                    type: 'doc',
                    label: '(members)',
                    id: 'api/index',
                },
            ],
        };
        this._buildNavigation(navigationFile.items, this.context.apiModel);
        const navFilePath = path.join(this.context.outputFolder, '..', 'api_nav.json');
        const navFileContent = JSON.stringify(navigationFile, undefined, 2);
        node_core_library_1.FileSystem.writeFile(navFilePath, navFileContent, {
            ensureFolderExists: true,
        });
    }
    _buildNavigation(parentNodes, parentApiItem) {
        for (const apiItem of parentApiItem.members) {
            if (this._apiItemsWithPages.has(apiItem)) {
                const label = apiItem.displayName;
                const id = path.posix
                    .join('api/', this.context.documenter.getLinkForApiItem(apiItem))
                    .replace(/\.md$/, '')
                    .replace(/\/$/, '/index');
                const children = [];
                this._buildNavigation(children, apiItem);
                if (children.length > 0) {
                    const newNode = {
                        type: 'category',
                        label,
                        items: [
                            {
                                type: 'doc',
                                label: '(members)',
                                id,
                            },
                            ...children,
                        ],
                    };
                    parentNodes.push(newNode);
                }
                else {
                    const newNode = {
                        type: 'doc',
                        label,
                        id,
                    };
                    parentNodes.push(newNode);
                }
            }
            else {
                this._buildNavigation(parentNodes, apiItem);
            }
        }
    }
}
exports.DocusaurusMarkdownFeature = DocusaurusMarkdownFeature;
exports.apiDocumenterPluginManifest = {
    manifestVersion: 1000,
    features: [
        {
            featureName: 'docusaurus-markdown-documenter',
            kind: 'MarkdownDocumenterFeature',
            subclass: DocusaurusMarkdownFeature,
        },
    ],
};
