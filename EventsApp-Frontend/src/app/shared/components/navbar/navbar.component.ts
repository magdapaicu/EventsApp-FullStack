import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { SearchService } from 'src/app/services/search-service/search.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  clickprofile: boolean = false;
  searchCards: string = '';
  isConfirmed: boolean = false;
  isAdmin: boolean = false;
  clickFavorite: boolean = false;
  clickHome: boolean = true;
  matchingUser: User[];
  imageSrc: SafeUrl;

  // private isConfirmedSubscription: Subscription;
  // private isAdminSubscription: Subscription;

  constructor(
    private searchCardsService: SearchService,
    private dialogService: DialogService,
    private router: Router,
    private navbarService: NavbarService,
    private userService: UsersService
  ) {
    // this.isConfirmedSubscription = this.authService
    //   .isConfirmObservable()
    //   .subscribe((isConfirmed: boolean) => {
    //     this.isConfirmed = isConfirmed;
    //   });
    // this.isAdminSubscription = this.authService
    //   .isAdminObservable()
    //   .subscribe((isAdmin: boolean) => {
    //     this.isAdmin = isAdmin;
    //   });
  }

  ngOnInit(): void {
    // this.userService.searchUser(this.searchCards).subscribe((data) => {
    //   this.matchingUser = data;
    //   console.log(this.matchingUser);
    // });
    // this.authService.isAdminObservable().subscribe((isAdmin) => {
    //   this.isAdmin = isAdmin;
    // });
    // this.authService.isConfirmObservable().subscribe((isConfirmed) => {
    //   this.isConfirmed = isConfirmed;
    // });
  }

  mouseEnterProfile() {
    this.clickprofile = true;
  }

  mouseLeaveProfile() {
    this.clickprofile = false;
  }

  sendSearchCards() {
    this.searchCardsService.search(this.searchCards);

    this.userService.searchUser(this.searchCards).subscribe((data) => {
      this.matchingUser = data;
      console.log(this.matchingUser);
    });
  }
  openModal() {
    this.dialogService.openMyAccountDialog();
  }
  logout() {
    this.router.navigate(['login']);
  }
  login() {
    this.router.navigate(['login']);
  }
  register() {
    this.router.navigate(['create-account']);
  }

  // ngOnDestroy() {
  //   this.isConfirmedSubscription.unsubscribe();
  //   this.isAdminSubscription.unsubscribe();
  // }

  onFavoriteHomeClick() {
    this.clickFavorite = !this.clickFavorite;
    this.clickHome = !this.clickHome;
    this.navbarService.emitClickFavorite(this.clickFavorite);
    this.navbarService.emitClickHome(this.clickHome);
  }
}
