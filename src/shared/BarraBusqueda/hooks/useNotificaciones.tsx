import { useState, useEffect } from 'react';
import { Notification } from '../types/barra.types';
import { notificationService } from '../services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const result = await notificationService.getNotifications();
      setNotifications(result);
      setUnreadCount(result.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    showNotifications,
    setShowNotifications,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications
  };
};