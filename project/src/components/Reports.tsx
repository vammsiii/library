import React, { useState } from 'react';
import { FileText, TrendingUp, Users, AlertTriangle, Download } from 'lucide-react';
import { Book, Student, IssueLog } from '../App';

interface ReportsProps {
  books: Book[];
  students: Student[];
  issueLogs: IssueLog[];
}

const Reports: React.FC<ReportsProps> = ({ books, students, issueLogs }) => {
  const [activeTab, setActiveTab] = useState('issued');

  const currentlyIssued = issueLogs.filter(log => log.status === 'issued');
  const overdueBooks = issueLogs.filter(log => log.status === 'overdue');
  
  // Calculate popular books based on issue frequency
  const bookIssueCount = issueLogs.reduce((acc, log) => {
    acc[log.book_title] = (acc[log.book_title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularBooks = Object.entries(bookIssueCount)
    .map(([title, count]) => ({ title, total_issues: count }))
    .sort((a, b) => b.total_issues - a.total_issues)
    .slice(0, 10);

  // Calculate student activity
  const studentActivity = students.map(student => {
    const studentIssues = issueLogs.filter(log => log.student_id === student.student_id);
    const returned = studentIssues.filter(log => log.status === 'returned').length;
    const active = studentIssues.filter(log => log.status === 'issued' || log.status === 'overdue').length;
    
    return {
      student_name: student.name,
      books_borrowed: studentIssues.length,
      books_returned: returned,
      active_loans: active
    };
  });

  const handleExportReport = (reportType: string) => {
    // Simulate export functionality
    alert(`Exporting ${reportType} report...`);
  };

  const tabs = [
    { id: 'issued', label: 'Currently Issued', icon: FileText },
    { id: 'overdue', label: 'Overdue Books', icon: AlertTriangle },
    { id: 'popular', label: 'Popular Books', icon: TrendingUp },
    { id: 'students', label: 'Student Activity', icon: Users }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">View comprehensive library statistics and reports</p>
        </div>
        <button
          onClick={() => handleExportReport(activeTab)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{books.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Currently Issued</p>
              <p className="text-2xl font-bold text-gray-900">{currentlyIssued.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueBooks.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="border-b">
          <nav className="-mb-px flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Currently Issued Books */}
          {activeTab === 'issued' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Currently Issued Books ({currentlyIssued.length})</h3>
              {currentlyIssued.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No books currently issued</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Left</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentlyIssued.map((book, index) => {
                        const dueDate = new Date(book.due_date);
                        const today = new Date();
                        const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.book_title}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{book.student_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{book.issue_date}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{book.due_date}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                daysLeft > 3 
                                  ? 'bg-green-100 text-green-800' 
                                  : daysLeft > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Overdue Books */}
          {activeTab === 'overdue' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overdue Books ({overdueBooks.length})</h3>
              {overdueBooks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No overdue books at the moment!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase">Book Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase">Days Overdue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase">Fine</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {overdueBooks.map((book, index) => {
                        const dueDate = new Date(book.due_date);
                        const today = new Date();
                        const daysOverdue = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                        
                        return (
                          <tr key={index} className="hover:bg-red-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.book_title}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{book.student_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{book.due_date}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                {daysOverdue} days
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              ${book.fine_amount || (daysOverdue * 1)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Popular Books */}
          {activeTab === 'popular' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Books</h3>
              {popularBooks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No book issue data available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularBooks.map((book, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{book.title}</h4>
                          <p className="text-sm text-gray-600">{book.total_issues} total issues</p>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((book.total_issues / Math.max(...popularBooks.map(b => b.total_issues))) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Student Activity */}
          {activeTab === 'students' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Activity Summary</h3>
              {studentActivity.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No student activity data available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Books Borrowed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Books Returned</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Loans</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentActivity.map((student, index) => {
                        const returnRate = student.books_borrowed > 0 
                          ? Math.round((student.books_returned / student.books_borrowed) * 100) 
                          : 0;
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.student_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.books_borrowed}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.books_returned}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.active_loans}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">{returnRate}%</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      returnRate >= 80 ? 'bg-green-600' : 
                                      returnRate >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                                    }`}
                                    style={{ width: `${returnRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;