import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { NewsRoutes } from '../modules/news/news.routes';
import { ServiceRoutes } from '../modules/package/package.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { SuperAdminRoutes } from '../modules/super-admin/superAdmin.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/admin',
    routes: AdminRoutes,
  },
  {
    path: '/category',
    routes: CategoryRoutes,
  },
  {
    path: '/service',
    routes: ServiceRoutes,
  },
  {
    path: '/booking',
    routes: BookingRoutes,
  },
  {
    path: '/review',
    routes: ReviewRoutes,
  },
  {
    path: '/news',
    routes: NewsRoutes,
  },
  {
    path: '/faq',
    routes: FaqRoutes,
  },
  {
    path: '/super-admin',
    routes: SuperAdminRoutes,
  },
  {
    path: '/feedback',
    routes: FeedbackRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
