import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UIButtonDirective } from '@aria-ng/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, UIButtonDirective],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class Home {}
