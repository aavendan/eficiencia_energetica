import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  entries: number = 5;
  loading: boolean = false;
  projects: any[] = [];
  dataTableMessages = {
    emptyMessage: 'No se ha guardado ningún proyecto aún',
    totalMessage: 'proyectos',
  };
  response: any[] = [
    {
      name: 'Proyecto 1',
      efficiency: 0.5,
      ownerName: 'Juan Perez',
      technicianName: 'Pedro Perez',
      updatedAt: '01-01-2023 10:00',
    },
    {
      name: 'Proyecto 2',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    // Add more with random data
    {
      name: 'Proyecto 3',
      efficiency: 0.43456,
      ownerName: 'Maria Perez',
      technicianName: 'Ana Perez',
      updatedAt: '02-05-2023 12:30',
    },
    {
      name: 'Proyecto 4',
      efficiency: 0.28456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '03-03-2023 12:50',
    },
    {
      name: 'Proyecto 5',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 6',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 7',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 8',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 9',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;

    // Simulate a request
    setTimeout(() => {
      this.projects = this.response.map((project) => {
        return {
          ...project,
          efficiency: `${(project.efficiency * 100).toFixed(2)}%`,
        };
      });
      this.loading = false;
    }, 2000);
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  viewProject(project) {
    // add project name on query params
    this.router.navigate(['/eficiency/simulator'], { queryParams: { name: project.name } });
  }
}
