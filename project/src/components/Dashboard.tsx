import React, { useState } from 'react';
import { Book, Users, FileText, AlertTriangle, Plus, UserPlus, BookOpen, X, CheckCircle } from 'lucide-react';
import { Book as BookType, Student, IssueLog } from '../App';

interface DashboardProps {
  books: BookType[];
  students: Student[];
  issueLogs: IssueLog[];
  onPageChange: (page: string) => void;
  onAddBook: (book: Omit<BookType, 'book_id'>) => void;
  onAddStudent: (student: Omit<Student, 'student_id'>) => void;
  onIssueBook: (bookId: number, studentId: number) => boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  books, 
  students, 
  issueLogs, 
  onPageChange,
  onAddBook,
  onAddStudent,
  onIssueBook
}) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showBooksDetail, setShowBooksDetail] = useState(false);
  const [showStudentsDetail, setShowStudentsDetail] = useState(false);
  const [showIssuedDetail, setShowIssuedDetail] = useState(false);
  const [showOverdueDetail, setShowOverdueDetail] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publisher: '',
    year_published: new Date().getFullYear(),
    isbn: '',
    copies_total: 1,
    category: ''
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    course: '',
    year: 1,
    phone: '',
    address: ''
  });

  const [issueForm, setIssueForm] = useState({
    bookId: '',
    studentId: ''
  });

  const stats = {
    totalBooks: books.length,
    totalStudents: students.length,
    issuedBooks: issueLogs.filter(log => log.status === 'issued').length,
    overdueBooks: issueLogs.filter(log => log.status === 'overdue').length
  };

  const engineeringBooks = books.filter(book => book.category === 'Engineering');
  const currentlyIssued = issueLogs.filter(log => log.status === 'issued');
  const overdueBooks = issueLogs.filter(log => log.status === 'overdue');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(newBook);
    setNewBook({
      title: '',
      author: '',
      publisher: '',
      year_published: new Date().getFullYear(),
      isbn: '',
      copies_total: 1,
      category: ''
    });
    setShowBookModal(false);
    showSuccess('Book added successfully!');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(newStudent);
    setNewStudent({
      name: '',
      email: '',
      course: '',
      year: 1,
      phone: '',
      address: ''
    });
    setShowStudentModal(false);
    showSuccess('Student registered successfully!');
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onIssueBook(parseInt(issueForm.bookId), parseInt(issueForm.studentId));
    if (success) {
      setIssueForm({ bookId: '', studentId: '' });
      setShowIssueModal(false);
      showSuccess('Book issued successfully!');
    } else {
      alert('Failed to issue book. Please check availability.');
    }
  };

  const StatCard: React.FC<{ 
    title: string; 
    value: number; 
    icon: React.ElementType; 
    color: string;
    onClick: () => void;
  }> = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your library management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={Book}
          color="bg-blue-500"
          onClick={() => setShowBooksDetail(true)}
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-green-500"
          onClick={() => setShowStudentsDetail(true)}
        />
        <StatCard
          title="Issued Books"
          value={stats.issuedBooks}
          icon={FileText}
          color="bg-yellow-500"
          onClick={() => setShowIssuedDetail(true)}
        />
        <StatCard
          title="Overdue Books"
          value={stats.overdueBooks}
          icon={AlertTriangle}
          color="bg-red-500"
          onClick={() => setShowOverdueDetail(true)}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowBookModal(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Add New Book</span>
          </button>
          <button 
            onClick={() => setShowStudentModal(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <UserPlus className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Register Student</span>
          </button>
          <button 
            onClick={() => setShowIssueModal(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-600">Issue Book</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {issueLogs.slice(0, 4).map((log, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Book {log.status === 'issued' ? 'issued' : log.status === 'returned' ? 'returned' : 'overdue'}
                </p>
                <p className="text-sm text-gray-600">
                  "{log.book_title}" {log.status === 'issued' ? 'to' : 'by'} {log.student_name}
                </p>
              </div>
              <span className="text-xs text-gray-500">{log.issue_date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Books Detail Modal */}
      {showBooksDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Books ({books.length})</h2>
              <button onClick={() => setShowBooksDetail(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {books.map(book => (
                <div key={book.book_id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500">{book.category} • {book.copies_avail}/{book.copies_total} available</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Detail Modal */}
      {showStudentsDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Students ({students.length})</h2>
              <button onClick={() => setShowStudentsDetail(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(student => (
                <div key={student.student_id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">{student.course} • Year {student.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Issued Books Detail Modal */}
      {showIssuedDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Currently Issued Books ({currentlyIssued.length})</h2>
              <button onClick={() => setShowIssuedDetail(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {currentlyIssued.map(log => (
                <div key={log.issue_id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{log.book_title}</h3>
                      <p className="text-sm text-gray-600">Issued to: {log.student_name}</p>
                      <p className="text-sm text-gray-500">Due: {log.due_date}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Issued
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overdue Books Detail Modal */}
      {showOverdueDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Overdue Books ({overdueBooks.length})</h2>
              <button onClick={() => setShowOverdueDetail(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {overdueBooks.map(log => (
                <div key={log.issue_id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{log.book_title}</h3>
                      <p className="text-sm text-gray-600">Student: {log.student_name}</p>
                      <p className="text-sm text-red-600">Due: {log.due_date}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      Overdue
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add New Book</h2>
              <button onClick={() => setShowBookModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddBook} className="space-y-4">
              <input
                type="text"
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Publisher"
                value={newBook.publisher}
                onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={newBook.category}
                onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Literature">Literature</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Year"
                  value={newBook.year_published}
                  onChange={(e) => setNewBook({...newBook, year_published: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Copies"
                  min="1"
                  value={newBook.copies_total}
                  onChange={(e) => setNewBook({...newBook, copies_total: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="ISBN"
                value={newBook.isbn}
                onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Register Student</h2>
              <button onClick={() => setShowStudentModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={newStudent.course}
                onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newStudent.year}
                  onChange={(e) => setNewStudent({...newStudent, year: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                value={newStudent.address}
                onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Issue Book</h2>
              <button onClick={() => setShowIssueModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleIssueBook} className="space-y-4">
              <select
                value={issueForm.bookId}
                onChange={(e) => setIssueForm({...issueForm, bookId: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select Book</option>
                {books.filter(book => book.copies_avail > 0).map(book => (
                  <option key={book.book_id} value={book.book_id}>
                    {book.title} ({book.copies_avail} available)
                  </option>
                ))}
              </select>
              <select
                value={issueForm.studentId}
                onChange={(e) => setIssueForm({...issueForm, studentId: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.name} - {student.course}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Issue Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;