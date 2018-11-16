import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry } from 'src/app/models/time-entry.model';
import { FormatterService } from 'src/app/service/formatter.service';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent implements OnInit {
  @Input() entry: TimeEntry;
  @Input() index: number;

  fromTimeString: string;
  toTimeString: string;
  duration: number;

  constructor(private formatter: FormatterService) { }

  ngOnInit() {
    this.fromTimeString = this.formatter.convertTimeToString(this.entry['fromTime']);
    this.toTimeString = this.formatter.convertTimeToString(this.entry['toTime']);
    this.duration = this.formatter.calculateTimesToDuration(this.entry['fromTime'],this.entry['toTime']);
  }

}
