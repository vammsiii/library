import React, { useState } from 'react';
import { BookOpen, UserCheck, Calendar, RotateCcw, CheckCircle } from 'lucide-react';
import { Book, Student, IssueLog } from '../App';

interface IssueReturnProps {
  books: Book[];
  students: Student[];
  issueLogs: IssueLog[];
  onIssueBook: (bookId: number, studentId: number) => boolean;
  onReturnBook: (issueId: number) => boolean;
}

const IssueReturn: React.FC<IssueReturnProps> = ({ 
  books, 
  students, 
  issueLogs, 
  onIssueBook, 
  onReturnBook 
}) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleIssueBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook || !selectedStudent) return;

    const success = onIssueBook(parseInt(selectedBook), parseInt(selectedStudent));
    
    if (success) {
      setSelectedBook('');
      setSelectedStudent('');
      showSuccess('Book issued successfully!');
    } else {
      alert('Failed to issue book. Please check availability.');
    }
  };

  const handleReturnBook = async (issueId: number) => {
    const success = onReturnBook(issueId);
    if (success) {
      showSuccess('Book returned successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const availableBooks = books.filter(book => book.copies_avail > 0);

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Issue & Return Books</h1>
        <p className="text-gray-600 mt-1">Manage book loans and returns</p>
      </div>

      {/* Issue Book Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Issue New Book
        </h2>
        <form onSubmit={handleIssueBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Book</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a book...</option>
              {availableBooks.map(book => (
                <option key={book.book_id} value={book.book_id}>
                  {book.title} by {book.author} ({book.copies_avail} available)
                </option>
              ))}
            </select>
            {availableBooks.length === 0 && (
              <p className="text-sm text-red-600 mt-1">No books available for issue</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a student...</option>
              {students.map(student => (
                <option key={student.student_id} value={student.student_id}>
                  {student.name} - {student.course} (Year {student.year})
                </option>
              ))}
            </select>
            {students.length === 0 && (
              <p className="text-sm text-red-600 mt-1">No students registered</p>
            )}
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={availableBooks.length === 0 || students.length === 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Issue Book
            </button>
          </div>
        </form>
      </div>

      {/* Issue Logs */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Current Issues & Returns ({issueLogs.length} records)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issueLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No issue records found
                  </td>
                </tr>
              ) : (
                issueLogs.map((log) => (
                  <tr key={log.issue_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{log.book_title}</div>
                      <div className="text-xs text-gray-500">Book ID: {log.book_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.student_name}</div>
                      <div className="text-xs text-gray-500">Student ID: {log.student_id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.issue_date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.due_date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.return_date || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                        {log.status === 'overdue' && log.fine_amount && (
                          <span className="ml-1">(${log.fine_amount})</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.status === 'issued' || log.status === 'overdue' ? (
                        <button
                          onClick={() => handleReturnBook(log.issue_id)}
                          className="text-green-600 hover:text-green-800 flex items-center hover:bg-green-50 px-2 py-1 rounded transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Return
                        </button>
                      ) : (
                        <span className="text-gray-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueReturn;