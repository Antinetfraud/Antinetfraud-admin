import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, CanActivateChild, Routes, Router } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';

import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MAT_DIALOG_DATA
} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { LoadingComponent } from './module/loading/loading.component';
import { NavigationComponent } from './module/navigation/navigation.component';

import { ExitDialog } from './module/dialog/exit/exit.component';
import { DeleteDialog } from './module/dialog/delete/delete.component';
import { ReplyDialog } from './module/dialog/reply/reply.component';

import { PaginatorComponent } from './module/paginator/paginator.component';

import { AdminGuard } from './servies/admin-guard.service';
import { LoginGuard } from './servies/login-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import {
    EditComponent as ArticleEditComponent
} from './page/article/edit/edit.component';
import {
    CreateComponent as ArticleCreateComponent
} from './page/article/create/create.component';
import {
    MangerComponent as ArticleMangerComponent
} from './page/article/manger/manger.component';
import {
    ShowComponent as ArticleShowComponent
} from './page/article/show/show.component';

import {
    EditComponent as NoticeEditComponent
} from './page/notice/edit/edit.component';
import {
    CreateComponent as NoticeCreateComponent
} from './page/notice/create/create.component';
import {
    MangerComponent as NoticeMangerComponent
} from './page/notice/manger/manger.component';
import {
    ShowComponent as NoticeShowComponent
} from './page/notice/show/show.component';

import { CommentComponent } from './page/comment/comment.component';
import { UploadComponent } from './page/upload/upload.component';
import { LoginComponent } from './page/login/login.component';
import { PasswordComponent } from './page/administrator/password/password.component';
import {
    MangerComponent as AdminMangerComponent
} from './page/administrator/manger/manger.component';
import {
    CreateComponent as AdminCreateComponent
} from './page/administrator/create/create.component';
import { UserComponent } from './page/user/user.component';
import { ContributionComponent } from './page/contribution/contribution.component';
import { ShowComponent as ContributionShowComponent } from './page/contribution/show/show.component';
import {
    RecyclebinComponent as ArticleRecyclebinComponent
} from './page/article/recyclebin/recyclebin.component';
import {
    RecyclebinComponent as CommentRecyclebinComponent
} from './page/comment/recyclebin/recyclebin.component';
import {
    RecyclebinComponent as NoticeRecyclebinComponent
} from './page/notice/recyclebin/recyclebin.component';
import {
    RecyclebinComponent as UserRecyclebinComponent
} from './page/user/recyclebin/recyclebin.component';
import {
    RecyclebinComponent as AdministratorRecyclebinComponent
} from './page/administrator/recyclebin/recyclebin.component';
import {
    RecyclebinComponent as ContributionRecyclebinComponent
} from './page/contribution/recyclebin/recyclebin.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard], },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

];

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: NavigationComponent,
        canActivateChild: [AdminGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'article/create', component: ArticleCreateComponent },
            { path: 'article/show/:id', component: ArticleShowComponent },
            { path: 'article/edit/:id', component: ArticleEditComponent },
            { path: 'article/recyclebin', component: ArticleRecyclebinComponent },
            { path: 'article/manger/tag/:tag', component: ArticleMangerComponent },
            { path: 'article/manger/tag/:tag/page/:page', component: ArticleMangerComponent },
            { path: 'notice/create', component: NoticeCreateComponent },
            { path: 'notice/recyclebin', component: NoticeRecyclebinComponent },
            { path: 'notice/show/:id', component: NoticeShowComponent },
            { path: 'notice/edit/:id', component: NoticeEditComponent },
            { path: 'notice/manger/:page', component: NoticeMangerComponent },
            { path: 'comment/recyclebin', component: CommentRecyclebinComponent },
            { path: 'comment/:page', component: CommentComponent },
            { path: 'app/upload', component: UploadComponent },
            { path: 'password/reset', component: PasswordComponent },
            { path: 'user/recyclebin', component: UserRecyclebinComponent },
            { path: 'user/manger/:page', component: UserComponent },
            { path: 'administrator/recyclebin', component: AdministratorRecyclebinComponent },
            { path: 'administrator/manger/:page', component: AdminMangerComponent },
            { path: 'administrator/create', component: AdminCreateComponent },
            { path: 'contribution/recyclebin', component: ContributionRecyclebinComponent },
            { path: 'contribution/manger/:page', component: ContributionComponent },
            { path: 'contribution/show/:id', component: ContributionShowComponent },
        ],

    },
];

@NgModule({
    declarations: [
        ExitDialog,
        DeleteDialog,
        ReplyDialog,
        PaginatorComponent,

        AppComponent,
        HomeComponent,
        ArticleEditComponent,
        ArticleCreateComponent,
        ArticleMangerComponent,
        ArticleShowComponent,
        NoticeEditComponent,
        NoticeCreateComponent,
        NoticeMangerComponent,
        NoticeShowComponent,
        CommentComponent,
        UploadComponent,
        LoadingComponent,
        NavigationComponent,
        LoginComponent,
        PasswordComponent,
        UserComponent,
        AdminMangerComponent,
        AdminCreateComponent,
        ContributionComponent,
        ArticleRecyclebinComponent,
        CommentRecyclebinComponent,
        ContributionShowComponent,
        NoticeRecyclebinComponent,
        UserRecyclebinComponent,
        AdministratorRecyclebinComponent,
        ContributionRecyclebinComponent,
    ],
    entryComponents: [ExitDialog, DeleteDialog, ReplyDialog],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        ),
        RouterModule.forRoot(
            adminRoutes,
            { enableTracing: false } // <-- debugging purposes only
        ),
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        HttpClientModule,
        FormsModule,
        CommonModule,

    ],
    providers: [AdminGuard, LoginGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
