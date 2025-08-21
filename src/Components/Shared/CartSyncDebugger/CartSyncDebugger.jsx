'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import cartSyncHelper from '@/utils/cartSyncHelper';

/**
 * مكون تطوير لمراقبة واختبار مزامنة السلة
 * يظهر فقط في بيئة التطوير
 */
export default function CartSyncDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState([]);
  const cartState = useCart();
  const { isAuthenticated } = useAuth();

  // إظهار المكون فقط في بيئة التطوير
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  // إضافة لوق جديد
  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [newLog, ...prev.slice(0, 9)]); // الاحتفاظ بآخر 10 لوقات
  };

  // اختبار السيناريوهات المختلفة
  const testScenarios = {
    createTestCart: () => {
      cartSyncHelper.createTestCart();
      addLog('تم إنشاء سلة تجريبية', 'success');
    },
    
    clearLocalCart: () => {
      if (cartSyncHelper.clearLocalCartWithConfirm()) {
        addLog('تم مسح السلة المحلية', 'warning');
      }
    },
    
    logCurrentStatus: () => {
      cartSyncHelper.logSyncStatus({...cartState, isAuthenticated});
      addLog('تم طباعة حالة المزامنة في الكونسول', 'info');
    },
    
    forceSync: () => {
      if (cartState.syncCartOnLogin) {
        cartState.syncCartOnLogin();
        addLog('تم تشغيل المزامنة يدوياً', 'info');
      } else {
        addLog('دالة المزامنة غير متاحة', 'error');
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      width: '350px',
      maxHeight: '400px',
      backgroundColor: '#1f2937',
      color: 'white',
      borderRadius: '8px',
      border: '2px solid #3b82f6',
      zIndex: 9999,
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      {/* Header */}
      <div style={{
        padding: '8px 12px',
        backgroundColor: '#3b82f6',
        borderRadius: '6px 6px 0 0',
        fontWeight: 'bold'
      }}>
        🛒 Cart Sync Debugger
      </div>

      {/* Status */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #374151' }}>
        <div>🔐 Authenticated: <span style={{color: isAuthenticated ? '#10b981' : '#ef4444'}}>{isAuthenticated ? 'Yes' : 'No'}</span></div>
        <div>🔄 Syncing: <span style={{color: cartState.isSyncing ? '#f59e0b' : '#10b981'}}>{cartState.isSyncing ? 'Yes' : 'No'}</span></div>
        <div>✅ Synced: <span style={{color: cartState.syncedOnLogin ? '#10b981' : '#6b7280'}}>{cartState.syncedOnLogin ? 'Yes' : 'No'}</span></div>
        <div>📦 Cart Items: <span style={{color: '#3b82f6'}}>{cartState.cart?.length || 0}</span></div>
        <div>💾 Local Items: <span style={{color: '#8b5cf6'}}>{cartSyncHelper.getLocalCartItemCount()}</span></div>
        <div>🔗 With CartID: <span style={{color: '#10b981'}}>{cartState.cart?.filter(item => item.cartItemId).length || 0}</span></div>
        <div>❓ Missing ID: <span style={{color: '#ef4444'}}>{cartState.cart?.filter(item => !item.cartItemId).length || 0}</span></div>
      </div>

      {/* Actions */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #374151' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          <button
            onClick={testScenarios.createTestCart}
            style={{ padding: '4px 6px', backgroundColor: '#10b981', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            Create Test Cart
          </button>
          <button
            onClick={testScenarios.clearLocalCart}
            style={{ padding: '4px 6px', backgroundColor: '#ef4444', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            Clear Local
          </button>
          <button
            onClick={testScenarios.logCurrentStatus}
            style={{ padding: '4px 6px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            Log Status
          </button>
          <button
            onClick={testScenarios.forceSync}
            style={{ padding: '4px 6px', backgroundColor: '#f59e0b', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            Force Sync
          </button>
        </div>
      </div>

      {/* Logs */}
      <div style={{ 
        padding: '8px 12px', 
        maxHeight: '150px', 
        overflowY: 'auto',
        backgroundColor: '#111827'
      }}>
        <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>📋 Recent Logs:</div>
        {logs.length === 0 ? (
          <div style={{ color: '#6b7280', fontStyle: 'italic' }}>No logs yet...</div>
        ) : (
          logs.map(log => (
            <div key={log.id} style={{ 
              marginBottom: '2px',
              color: log.type === 'error' ? '#ef4444' : 
                     log.type === 'warning' ? '#f59e0b' :
                     log.type === 'success' ? '#10b981' : '#d1d5db'
            }}>
              <span style={{ color: '#6b7280' }}>[{log.timestamp}]</span> {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
