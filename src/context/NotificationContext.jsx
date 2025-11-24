import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    setNotifications((prev) => [...prev, newNotification]);
    const duration = notification.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
  }, [removeNotification]);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification, clearAllNotifications }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
      default:
        return "text-blue-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((n) => (
        <div key={n.id} className={`${getBgColor(n.type)} border rounded-xl shadow-lg p-4 transform transition-all duration-300 ease-out animate-slide-in-right overflow-hidden isolate bg-clip-padding`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 bg-transparent">{getIcon(n.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm ${getTextColor(n.type)}`}>{n.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                  {n.action && (
                    <button onClick={n.action.onClick} className="text-sm font-medium text-blue-600 hover:text-blue-800 mt-2 transition-colors">
                      {n.action.label}
                    </button>
                  )}
                </div>
                <button onClick={() => removeNotification(n.id)} className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 bg-transparent">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export function useNotificationToast() {
  const { showNotification } = useNotification();
  const success = (title, message, duration = 5000) => showNotification({ type: "success", title, message, duration });
  const error = (title, message, duration = 5000) => showNotification({ type: "error", title, message, duration });
  const warning = (title, message, duration = 5000) => showNotification({ type: "warning", title, message, duration });
  const info = (title, message, duration = 5000) => showNotification({ type: "info", title, message, duration });
  const withAction = (type, title, message, actionLabel, actionOnClick, duration = 8000) =>
    showNotification({ type, title, message, duration, action: { label: actionLabel, onClick: actionOnClick } });
  return { success, error, warning, info, withAction };
}


