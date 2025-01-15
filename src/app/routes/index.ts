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
import { FavoriteRoutes } from '../modules/favorite/bookmark.routes';
import { NoteRoutes } from '../modules/note/note.routes';
import { TodoRoutes } from '../modules/todo/todo.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { WalletRoutes } from '../modules/wallet/wallet.routes';
import { TransactionRoutes } from '../modules/transaction/transaction.routes';
import { RechargeRoutes } from '../modules/recharge/recharge.routes';
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
    { path: "/favorite", route: FavoriteRoutes },
    { path: "/note", route: NoteRoutes },
    { path: "/todo", route: TodoRoutes },
    { path: "/payment", route: PaymentRoutes },
    { path: "/wallet", route: WalletRoutes },
    { path: "/transaction", route: TransactionRoutes },
    { path: "/recharge", route: RechargeRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;