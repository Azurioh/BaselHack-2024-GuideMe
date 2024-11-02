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

        const guideline = await this.guidelineService.createGuideline(guidelineData);

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
  }
