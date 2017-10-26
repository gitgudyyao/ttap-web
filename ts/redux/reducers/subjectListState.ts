import {
    Subject
} from "../../model/subject";
import {
    GetTestSubjects1
} from "./../../tests/testDataGenerator";
import {
    GenereteReducer
} from "./GenerateReducer";

export interface ISubjectListState {
    SearchedText: string;
    Subjects: Subject[];
    IsShowingSelectedSubjectOnly: boolean;
}

export class SubjectListViewState implements ISubjectListState {
    public SearchedText: string;
    public Subjects: Subject[];
    public IsShowingSelectedSubjectOnly: boolean;
    public constructor(subject = GetTestSubjects1()) {
        this.SearchedText = "";
        this.Subjects = subject;
        this.IsShowingSelectedSubjectOnly = false;
    }
}

export const SubjectListReducer = GenereteReducer(new SubjectListViewState());