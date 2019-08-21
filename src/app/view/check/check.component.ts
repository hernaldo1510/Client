import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.paramMap.get('token');
    if (token && id) {
      this.auth.setToken(token);
      this.router.navigate(['view', id]);
    } else {
      this.goToError();
    }
  }

  goToError() {
    this.auth.logout();
    this.router.navigateByUrl('/session/error');
  }
}
