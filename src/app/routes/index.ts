import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CampaignRoutes } from '../modules/campaign/campaign.routes';
import { QuestionRoutes } from '../modules/question/question.routes';
import { ApplicationRoutes } from '../modules/application/application.routes';
import { AnalyticRoutes } from '../modules/analytics/analytic.routes';
import { ChatRoutes } from '../modules/chat/chat.routes';
import { MessageRoutes } from '../modules/message/message.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { BookmarkRoutes } from '../modules/bookmark/bookmark.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/campaign", route: CampaignRoutes },
    { path: "/question", route: QuestionRoutes },
    { path: "/application", route: ApplicationRoutes },
    { path: "/analytic", route: AnalyticRoutes },
    { path: "/chat", route: ChatRoutes },
    { path: "/message", route: MessageRoutes },
    { path: "/review", route: ReviewRoutes },
    { path: "/contact", route: ContactRoutes },
    { path: "/bookmark", route: BookmarkRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;