import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './Services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private httpServiceService: HttpServiceService) {

  }
  title = 'weTest';
  name:any="";
  job:any="";
  status:any="";
  Data:any[]=[]
  newEmployees:any;
  probationaryStaff:any;
  existingEmployees:any;
  localEmployeesForPension:any;
  selectedType="";
  action:any="";
  editEmpId="";
  ngOnInit(): void {
    this.getAllDataByType('1');
  }
  getAllDataByType(type:any)
  {
    this.selectedType=type;
     this.httpServiceService.getAll(type).pipe().subscribe(result => { 
      this.Data=result.emp_Datas;
      this.newEmployees=result.arr["newEmployees"]
      this.probationaryStaff=result.arr["probationaryStaff"]
      this.existingEmployees=result.arr["existingEmployees"]
      this.newEmployees=result.arr["newEmployees"]
      this.localEmployeesForPension=result.arr["localEmployeesForPension"]
      console.log(result);
    });
  }
  DeleteEmployee(id : any)
  {
    this.httpServiceService.delete(id).pipe().subscribe(result => { 
      console.log(result);
      this.getAllDataByType(this.selectedType);
    });
  }

  creatEmployee()
  {
    let emp={
      "type": this.status,
      "emp_name": this.name,
      "emp_job":this.job,
    }
    this.httpServiceService.create(emp).pipe().subscribe(result => { 
      console.log(result);
      this.getAllDataByType(this.selectedType);
      this.status="";
      this.name="";
      this.job="";
    });
  }

  getEmployee(id : any)
  {
    this.action="edit";
    this.editEmpId=id;
    this.httpServiceService.getById(id).pipe().subscribe(result => { 
      console.log(result);
      this.status=result.type;
      this.name=result.emp_name;
      this.job=result.emp_job;
    });
  }

  editEmployee()
  {
    let emp={
      "emp_id":this.editEmpId,
      "type": this.status,
      "emp_name": this.name,
      "emp_job":this.job,
    }
    this.httpServiceService.update(emp).pipe().subscribe(result => { 
      console.log(result);
      this.getAllDataByType(this.selectedType);
      this.status="";
      this.name="";
      this.job="";
    });
  }
}


