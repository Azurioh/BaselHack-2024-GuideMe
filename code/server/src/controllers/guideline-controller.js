import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { parseTokenData } from '../libs/token.js  ';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class GuidelineController {
  constructor(guidelineService) {
    this.guidelineService = guidelineService;
  }

  getAllGuidelines = async (req, res) => {
    try {
      const guidelines = await this.guidelineService.getAllGuidelines();

      res.status(200).json({ data: { guidelines } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  getGuidelineById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const guideline = await this.guidelineService.getGuidelineById(id);

      res.status(200).json({ data: { guideline } });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'Guideline not found.' });
    }
  };

  createGuideline = async (req, res) => {
    try {
      const guidelineData = req.body;
      const token = parseTokenData(req);

      const guideline = await this.guidelineService.createGuideline(guidelineData, token.id);

      res.status(201).json({ data: { guideline } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  updateGuideline = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const guidelineData = req.body;

      const guideline = await this.guidelineService.updateGuideline(id, guidelineData);

      res.status(200).json({ data: { guideline } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  deleteGuideline = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      await this.guidelineService.deleteGuideline(id);

      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };

  generateFileFromMarkdown = async (req, res) => {
    try {
      const { markdownContent, title, format } = req.body;

      if (!markdownContent) {
        return res.status(400).json({ err: 'Contenu Markdown requis.' });
      }

      const markdownFilePath = path.join(__dirname, 'temp.md');
      const outputFilePath = path.join(__dirname, `output.${format}`);
      const templatePath = path.join(__dirname, 'custom-template.tex');

      const content = `---
title: "${title}"
---

${markdownContent}`;

      fs.writeFileSync(markdownFilePath, content);

      let command;
      if (format === 'pdf') {
        command = `pandoc ${markdownFilePath} --pdf-engine=xelatex --template=${templatePath} --resource-path=${__dirname} -o ${outputFilePath}`;
      } else if (format === 'docx') {
        command = `pandoc ${markdownFilePath} -o ${outputFilePath}`;
      } else {
        return res.status(400).json({ err: 'Format unknow. Use "pdf" or "docx".' });
      }

      exec(command, (error) => {
        if (error) {
          return res.status(500).json({ err: 'Error in convert file.' });
        }

        res.download(outputFilePath, `output.${format}`, (err) => {
          if (err) {
            return res.status(500).json({ err: 'Error while downloading file.' });
          }

          fs.unlinkSync(markdownFilePath);
          fs.unlinkSync(outputFilePath);
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Error server.' });
    }
  };
}
