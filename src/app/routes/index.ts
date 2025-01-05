import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CampaignRoutes } from '../modules/campaign/campaign.routes';
import { QuestionRoutes } from '../modules/question/question.routes';
import { ApplicationRoutes } from '../modules/application/application.routes';
import { AnalyticRoutes } from '../modules/analytics/analytic.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/campaign", route: CampaignRoutes },
    { path: "/question", route: QuestionRoutes },
    { path: "/application", route: ApplicationRoutes },
    { path: "/analytic", route: AnalyticRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;