create table students (
    StudentID int not null,
    primary key (StudentID)
);

create table attributes(
    AttrName varchar(10) not null,
    AttrID int not null,
    primary key (AttrID)
);

create table student_attribute (
    AttrValue int not null,
    AttrID int not null references attributes(AttrID) on delete cascade on update cascade,
    StudentID int not null references students(StudentID) on delete cascade on update cascade
);