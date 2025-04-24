

interface PaginationProps {
    onNext: () => void;
    onPrev: () => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }