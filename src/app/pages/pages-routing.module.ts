import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboards/dashboards.module').then(m => m.DashboardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-client',
    loadChildren: () =>
      import('./manage-client/manage-client.module').then(
        m => m.ManageClientModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-skill',
    loadChildren: () =>
      import('./manage-skill/manage-skill.module').then(
        m => m.ManageSkillModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-product',
    loadChildren: () =>
      import('./manage-product/manage-product.module').then(
        m => m.ManageProductModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-user',
    loadChildren: () =>
      import('./manage-user/manage-user.module').then(m => m.ManageUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tl-main-screen',
    loadChildren: () =>
      import('./tl-main-screen/tl-main-screen.module').then(
        m => m.TlMainScreenModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-role',
    loadChildren: () =>
      import('./manage-role/manage-role.module').then(m => m.ManageRoleModule)
  },
  {
    path: 'team-member-main-screen',
    loadChildren: () =>
      import('./team-member-main-screen/team-member-main-screen.module').then(
        m => m.TeamMemberMainScreenModule
      )
  },
  {
    path: 'order-management',
    loadChildren: () =>
      import('./order-management/order-management.module').then(
        m => m.OrderManagementModule
      )
  },
  {
    path: 'activity-log',
    loadChildren: () =>
      import('./activity-log/activity-log.module').then(
        m => m.ActivityLogModule
      )
  },
  {
    path: 'overtime-screen',
    loadChildren: () =>
      import('./overtime-screen/overtime-screen.module').then(
        m => m.OvertimeScreenModule
      )
  },
  {
    path: 'quality-audit',
    loadChildren: () =>
      import('./quality-audit/quality-audit.module').then(
        m => m.QualityAuditModule
      )
  },
  {
    path: 'weblinks',
    loadChildren: () =>
      import('./weblinks-mapping/weblinks-mapping.module').then(
        m => m.WeblinksMappingModule
      )
  },
  {
    path: 'review-orders',
    loadChildren: () =>
      import('./pending-review/pending-review.module').then(
        m => m.PendingReviewModule
      )
  },
  {
    path: 'pending-audit',
    loadChildren: () =>
      import('./pending-audit/pending-audit.module').then(
        m => m.PendingAuditModule
      )
  },
  {
    path: 'bulk-orders',
    loadChildren: () =>
      import('./bulk-orders/bulk-orders.module').then(
        (m) => m.BulkOrdersModule
      ),
    canActivate: [AuthGuard],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
