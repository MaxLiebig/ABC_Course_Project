import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry } from 'src/app/models/time-entry.model';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent implements OnInit {
  @Input() entry: TimeEntry;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
