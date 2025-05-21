import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, ThumbsDown, Filter, RefreshCw, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCreateComment } from '../hooks/useComent';
import { useCreateResponse } from '../hooks/useResponseCreate';
import { useCommentsGet } from '../hooks/useCommentGet';
import { useResponseGet } from '../hooks/useResponseGet';
import { ComentDataEnviar, CommentsParamsGet, ResponseDataEnviar } from '../types/comentariosData.types';

interface CommentsSectionProps {
  postId: number;
  userId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId, userId }) => {
  const [commentText, setCommentText] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [replyingToResponse, setReplyingToResponse] = useState<{commentId: number, responseId: number} | null>(null);
  
  // Estado para los filtros
  const [filters, setFilters] = useState<CommentsParamsGet>({
    idPost: postId,
    orderByCreateAt: 'desc', // Por defecto, más recientes primero
    orderByLikes: '',
    oderByDislikes: ''
  });
  
  // Obtener comentarios usando el hook
  const { comments, loading: loadingComments, error: errorComments } = useCommentsGet(filters);
  
  // Hook para crear comentarios
  const { handleCreateComment, loading: loadingCreate, error: errorCreate, success } = useCreateComment();
  
  // Hook para crear respuestas a comentarios
  const { handleCreateResponse, loading: loadingResponse, error: errorResponse, success: successResponse } = useCreateResponse();
  
  // Actualizar los filtros cuando cambia el método de ordenación
  useEffect(() => {
    switch (sortBy) {
      case 'date':
        setFilters({
          ...filters,
          orderByCreateAt: 'desc',
          orderByLikes: '',
          oderByDislikes: ''
        });
        break;
      case 'date-asc':
        setFilters({
          ...filters,
          orderByCreateAt: 'asc',
          orderByLikes: '',
          oderByDislikes: ''
        });
        break;
      case 'likes':
        setFilters({
          ...filters,
          orderByCreateAt: '',
          orderByLikes: 'desc',
          oderByDislikes: ''
        });
        break;
      case 'dislikes':
        setFilters({
          ...filters,
          orderByCreateAt: '',
          orderByLikes: '',
          oderByDislikes: 'desc'
        });
        break;
      default:
        break;
    }
  }, [sortBy, postId]);
  
  // Limpiar el formulario después de enviar un comentario exitosamente
  useEffect(() => {
    if (success) {
      setCommentText('');
      // Recargar comentarios manteniendo el mismo filtro
      setFilters({...filters});
    }
  }, [success]);
  
  // Limpiar formulario de respuesta después de enviar una respuesta exitosamente
  useEffect(() => {
    if (successResponse) {
      setReplyText('');
      setReplyingTo(null);
      setReplyingToResponse(null);
      // Recargar comentarios manteniendo el mismo filtro
      setFilters({...filters});
    }
  }, [successResponse]);
  
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    
    const commentData: ComentDataEnviar = {
      idPost: postId,
      idUser: userId,
      content: commentText
    };
    
    await handleCreateComment(commentData);
  };
  
  const handleSubmitResponse = async () => {
    if (!replyText.trim()) return;
    
    let responseData: ResponseDataEnviar;
    
    if (replyingToResponse) {
      // Respondiendo a una respuesta (no a un comentario principal)
      responseData = {
        idComment: replyingToResponse.commentId,
        idUser: userId,
        content: replyText,
        parentId: replyingToResponse.responseId // Enviamos el ID de la respuesta padre
      };
    } else if (replyingTo) {
      // Respondiendo a un comentario principal
      responseData = {
        idComment: replyingTo,
        idUser: userId,
        content: replyText
      };
    } else {
      return; // No se debería llegar aquí
    }
    
    console.log('Enviando respuesta:', responseData);
    await handleCreateResponse(responseData);
  };
  
  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyingToResponse(null);
    setReplyText('');
  };
  
  const toggleResponses = (commentId: number) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter(id => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };
  
  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'hoy';
    } else if (diffDays === 1) {
      return 'ayer';
    } else {
      return `hace ${diffDays} días`;
    }
  };
  
  // Obtener la primera letra del nombre para el avatar
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };
  
  // Componente para las respuestas a un comentario
  const ResponsesList = ({ commentId }: { commentId: number }) => {
    const { responses, loading, error } = useResponseGet({ idComment: commentId.toString() });
    
    if (loading) {
      return (
        <div className="ml-14 mt-3 flex items-center text-sm text-gray-500">
          <RefreshCw className="w-4 h-4 animate-spin mr-2" />
          Cargando respuestas...
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="ml-14 mt-3 text-sm text-red-500">
          Error al cargar respuestas: {error}
        </div>
      );
    }
    
    if (!responses || responses.length === 0) {
      return (
        <div className="ml-14 mt-3 text-sm text-gray-500">
          No hay respuestas para este comentario.
        </div>
      );
    }
    
    return (
      <div className="ml-14 mt-3 space-y-4">
        {responses.map(response => (
          <ResponseItem 
            key={response.id} 
            response={response} 
            commentId={commentId} 
          />
        ))}
      </div>
    );
  };
  
  // Componente para cada respuesta individual
  const ResponseItem = ({ response, commentId, isNested = false }) => {
    return (
      <div className={`flex items-start space-x-2 ${isNested ? 'ml-10' : ''}`}>
        <div className={`${isNested ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold shrink-0 ${isNested ? 'text-xs' : ''}`}>
          {getInitial(response.user.name)}
        </div>
        <div className="flex-1">
          <div className="flex items-center flex-wrap">
            <span className="font-medium text-gray-800">{response.user.name}</span>
            <span className="ml-2 text-xs text-gray-500">{formatDate(response.createdAt)}</span>
          </div>
          <p className="mt-1 text-gray-600 text-sm">{response.content}</p>
          <div className="mt-1 flex items-center space-x-3">
            <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              <span>{response.likes || 0}</span>
            </button>
            <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center">
              <ThumbsDown className="w-3 h-3 mr-1" />
              <span>{response.dislikes || 0}</span>
            </button>
            <button 
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center"
              onClick={() => {
                setReplyingToResponse({commentId, responseId: response.id});
                setReplyingTo(null);
                setReplyText(`@${response.user.name} `);
              }}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              <span>Responder</span>
            </button>
          </div>
          
          {/* Mostrar respuestas anidadas si existen */}
          {response.responses && response.responses.length > 0 && (
            <div className="mt-3 space-y-3">
              {response.responses.map(nestedResponse => (
                <ResponseItem 
                  key={nestedResponse.id} 
                  response={nestedResponse} 
                  commentId={commentId} 
                  isNested={true} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Comentarios
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({comments?.length || 0})
          </span>
        </h3>
        
        {/* Selector de ordenación */}
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          <select 
            className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Más recientes</option>
            <option value="date-asc">Más antiguos</option>
            <option value="likes">Más likes</option>
            <option value="dislikes">Más dislikes</option>
          </select>
        </div>
      </div>
      
      {/* Formulario de comentario principal */}
      <div className="flex items-start space-x-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
          U
        </div>
        <div className="flex-1">
          <textarea 
            placeholder="Añade un comentario..." 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={loadingCreate}
          ></textarea>
          
          {errorCreate && (
            <div className="mt-2 text-red-500 text-sm">{errorCreate}</div>
          )}
          
          <div className="flex justify-end mt-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${loadingCreate ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white px-5 py-2 rounded-lg transition-colors font-medium shadow-sm flex items-center`}
              onClick={handleSubmitComment}
              disabled={loadingCreate || !commentText.trim()}
            >
              {loadingCreate ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Enviando...
                </>
              ) : 'Comentar'}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Estado de carga de comentarios */}
      {loadingComments && (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-red-600" />
          <span className="ml-2 text-gray-600">Cargando comentarios...</span>
        </div>
      )}
      
     
      
      {/* Formulario de respuesta (si está respondiendo a un comentario o respuesta) */}
      {(replyingTo || replyingToResponse) && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center mb-3">
            <span className="text-sm text-gray-700">
              Respondiendo a <span className="font-medium">
                {replyingTo && comments?.find(c => c.id === replyingTo)?.user.name}
                {replyingToResponse && replyText.split(' ')[0]}
              </span>
            </span>
            <button 
              className="ml-auto text-gray-400 hover:text-gray-600"
              onClick={handleCancelReply}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shrink-0 text-xs">
              U
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Escribe tu respuesta..." 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={loadingResponse}
              ></textarea>
              
              {errorResponse && (
                <div className="mt-2 text-red-500 text-sm">{errorResponse}</div>
              )}
              
              <div className="flex justify-end mt-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${loadingResponse ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-md transition-colors font-medium shadow-sm flex items-center`}
                  onClick={handleSubmitResponse}
                  disabled={loadingResponse || !replyText.trim()}
                >
                  {loadingResponse ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Responder</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de comentarios */}
      {!loadingComments && comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold shrink-0">
                {getInitial(comment.user.name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center flex-wrap">
                  <span className="font-medium text-gray-800">{comment.user.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-2 text-gray-600">{comment.content}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    <span>{comment.dislikes}</span>
                  </button>
                  <button 
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center"
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setReplyingToResponse(null);
                      setReplyText('');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Responder</span>
                  </button>
                  
                  {/* Botón para mostrar/ocultar respuestas */}
                  <button 
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center ml-auto"
                    onClick={() => toggleResponses(comment.id)}
                  >
                    {expandedComments.includes(comment.id) ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        <span>Ocultar respuestas</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        <span>Ver respuestas</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Mostrar respuestas cuando está expandido */}
                {expandedComments.includes(comment.id) && (
                  <ResponsesList commentId={comment.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loadingComments && !errorComments && (
          <div className="text-center py-8 text-gray-500">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </div>
        )
      )}
    </motion.div>
  );
};

export default CommentsSection;