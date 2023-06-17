# Bard Bot

Bard Bot is designed to help you use Google's Bard AI in your Discord server free of charge.

## Table of Contents

- [Overview](#overview)
- [Commands](#commands)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview

Bard Bot enables you to integrate Google's Bard AI into your Discord server, allowing you to generate creative and engaging text with the power of natural language processing. With Bard Bot, you can harness the capabilities of the Bard model to assist with writing, storytelling, conversation, and much more.
## Commands

- `/botinfo` - Replies with information about the bot.
- `/ping` - Replies with the current bot ping.
- 
### Advertisement

- `/ask {question}` - Ask Question a to Bard.
- `/setup {channel}` - Setup a Channel to Talk to Bard.

## Getting Started

### Installation

- run `npm install` in terminal to install all the required packages.

### Usage

When you have filled your `.env.example` and ran `npm install` in the terminal, you can start the bot by running `node .` or `node cluster.js`

## Configuration

- `token` you can get from [Discord Developer Portal](https://discord.com/developers/applications)
- `Mongo Db` you can get from [Mongo Db](https://cloud.mongodb.com/)
- `Bard` To obtain the session token, follow these steps:
   - Go to bard.google.com and carry on with the onboarding process if you have not done so already.
   - Press F12 to open Developer Tools and go to the Application tab.
   - On the left-hand side, go to Cookies > https://bard.google.com.
   - On the right-hand side, find and copy the value of `__Secure-1PSID` and use it as your SESSION TOKEN.

## Contributing

Thank you for considering contributing to the Partner Bot project! We welcome contributions from the community to help improve and enhance the bot. To ensure a smooth and collaborative development process, please adhere to the following guidelines:

1. Before starting any work, please open an issue in the GitHub repository to discuss the proposed changes or bug fixes. This allows for better coordination and prevents duplication of efforts.

2. Fork the repository and create a new branch for your contribution. It's recommended to use descriptive branch names that reflect the nature of your changes.

3. Follow the coding style and conventions used in the project. This includes consistent indentation, meaningful variable and function names, and appropriate commenting.

4. Write clear and concise commit messages that explain the purpose of each commit.

5. Make sure your code is well-tested. Include relevant test cases and ensure all existing tests pass successfully.

6. When submitting a pull request, provide a detailed description of the changes you made and reference the related issue number(s) if applicable. This helps reviewers understand the purpose and context of your changes.

7. Be open to feedback and constructive criticism. Reviewers may suggest improvements or request modifications to ensure the quality and compatibility of the codebase.

8. Respect the opinions and ideas of other contributors. We encourage a friendly and inclusive environment where everyone feels welcome to participate.

### Issue Reporting

If you encounter any issues or bugs while using the Partner Bot, please follow these guidelines for reporting them:

1. Check the existing issues in the GitHub repository to see if the problem has already been reported. If it has, you can add relevant information or contribute to the existing discussion.

2. If the issue hasn't been reported, open a new issue and provide a clear and concise description of the problem. Include steps to reproduce the issue and any relevant error messages or logs.

3. If possible, include screenshots or code snippets that help demonstrate the issue.

4. Assign appropriate labels to the issue, such as "bug," "enhancement," or "feature request," to help with organization and prioritization.

## License

Copyright 2023 S7NX

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this project except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
